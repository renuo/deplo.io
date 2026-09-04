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
  def initialize(site, route, language)
    slug = route.fetch("page_key").tr("_", "-")
    super(site, site.source, "", "#{slug}-#{language}.html")

    self.data = route.reject { |key, _| key == "template" }.merge(
      "lang" => language,
      "layout" => "default"
    )
    self.content = "{% include pages/#{route.fetch('template')}.html %}"
  end
end

class LocalizedPagesGenerator < Jekyll::Generator
  safe true
  priority :low

  def generate(site)
    languages = site.data.fetch("languages").map { |language| language.fetch("code") }
    site.data.fetch("routes").product(languages).each do |route, language|
      site.pages << LocalizedPage.new(site, route, language)
    end
  end
end

Jekyll::Hooks.register :site, :after_init do |site|
  site.config["pricing_calculator_url"] = ENV.fetch(
    "PRICING_CALCULATOR_URL",
    "https://main.c7d7505.deploio.app"
  ).sub(%r{/$}, "")
  site.config["google_tag_id"] = ENV.fetch("GOOGLE_TAG_ID", ENV.fetch("VITE_GOOGLE_TAG_ID", ""))
end
