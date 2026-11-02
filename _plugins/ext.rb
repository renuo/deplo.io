require "digest"

# jekyll-i18n predates Jekyll::Document and aliases this legacy method while
# loading. This site has no posts; defining it keeps the gem usable on Jekyll 3.
unless Jekyll.const_defined?(:Post)
  Jekyll.const_set(:Post, Class.new { def url = @url })
end

require "jekyll-i18n"

# jekyll-i18n prefixes every translated page. Deploio keeps German at the
# root and prefixes the other languages, so localized pages declare a stable
# `route` and this small adapter produces the public URL.
module DeploioLocalizedUrl
  def url
    route = data["route"]
    lang = data["lang"]
    return super unless route && lang

    prefix = lang == "de" ? "" : "/#{lang}"
    route = "/#{route}" unless route.start_with?("/")
    route = "#{route}/" unless route.end_with?("/")
    route = "/" if route == "//"
    "#{prefix}#{route}".gsub(%r{/+}, "/")
  end
end

Jekyll::Page.prepend(DeploioLocalizedUrl)

class LocalizedPage < Jekyll::PageWithoutAFile
  def initialize(site, source_page, language)
    slug = source_page.data.fetch("page_key").tr("_", "-")
    super(site, site.source, "", "#{slug}-#{language}.html")

    self.data = source_page.data.merge(
      "lang" => language,
      "layout" => "default"
    )
    self.content = source_page.content
  end
end

class LocalizedPagesGenerator < Jekyll::Generator
  safe true
  priority :low

  def generate(site)
    languages = site.data.fetch("languages").map { |language| language.fetch("code") }
    source_pages = site.collections.fetch("pages").docs
    site.data["localized_pages"] = source_pages.map(&:data)

    source_pages.product(languages).each do |source_page, language|
      site.pages << LocalizedPage.new(site, source_page, language)
    end
  end
end

Jekyll::Hooks.register :site, :after_init do |site|
  site.config["pricing_api_url"] = ENV.fetch(
    "PRICING_API_URL",
    "https://calculator.nineapis.ch/products"
  )
  site.config["google_tag_id"] = ENV.fetch("GOOGLE_TAG_ID", ENV.fetch("VITE_GOOGLE_TAG_ID", ""))
end

# Like Rails' asset_path: `{{ 'assets/css/app.css' | asset_path }}` points at a
# copy named after the file's content, so browsers and the CDN fetch it again
# whenever it changes.
class DigestedAsset < Jekyll::StaticFile
  def url
    @url ||= "#{File.dirname(super)}/#{basename}-#{Digest::MD5.file(path).hexdigest[0, 8]}#{extname}"
  end

  def destination(dest)
    File.join(dest, url)
  end
end

class DigestedAssetsGenerator < Jekyll::Generator
  safe true

  def generate(site)
    assets = site.static_files.select { |file| %w[.css .js].include?(file.extname) }
    site.config["asset_paths"] = assets.to_h do |file|
      digested = DigestedAsset.new(site, site.source, File.dirname(file.relative_path), file.name)
      site.static_files << digested
      [file.relative_path.delete_prefix("/"), digested.url]
    end
  end
end

module AssetPathFilter
  def asset_path(path)
    @context.registers[:site].config.fetch("asset_paths").fetch(path)
  end
end

Liquid::Template.register_filter(AssetPathFilter)
