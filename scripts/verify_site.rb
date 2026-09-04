#!/usr/bin/env ruby

require "pathname"
require "uri"

root = Pathname.new(__dir__).join("..", "_site").expand_path
errors = []
languages = %w[de en fr it]
routes = %w[/ /pricing/ /team/ /success_story/ /success_story/demokratis/ /rails_world_2026/]

%w[bin node_modules scripts vendor].each do |directory|
  errors << "development directory copied to site: #{directory}" if root.join(directory).exist?
end

languages.product(routes).each do |language, route|
  prefix = language == "de" ? "" : "/#{language}"
  output = root.join("#{prefix}#{route}".sub(%r{\A/}, ""), "index.html")
  errors << "missing localized page: #{prefix}#{route}" unless output.file?
end

Dir[root.join("**", "*.html")].each do |filename|
  path = Pathname.new(filename)
  html = path.read
  errors << "unresolved Liquid in #{path.relative_path_from(root)}" if html.match?(/\{%|\{\{/)
  errors << "missing translation in #{path.relative_path_from(root)}" if html.include?("translation missing")

  html.scan(/(?:href|src)="([^"]+)"/).flatten.each do |reference|
    next unless reference.start_with?("/")

    clean = URI.decode_www_form_component(reference.split(/[?#]/, 2).first)
    target = root.join(clean.sub(%r{\A/}, ""))
    next if target.file? || target.join("index.html").file?

    errors << "broken local reference #{reference} in #{path.relative_path_from(root)}"
  end
end

abort(errors.uniq.join("\n")) unless errors.empty?
puts "Verified #{Dir[root.join('**', '*.html')].length} HTML files and #{languages.length * routes.length} localized routes"
