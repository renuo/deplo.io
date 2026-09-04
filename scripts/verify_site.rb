#!/usr/bin/env ruby

require "pathname"
require "uri"
require "yaml"

root = Pathname.new(__dir__).join("..", "_site").expand_path
errors = []
languages = %w[de en fr it]
routes = %w[/ /pricing/ /team/ /success_story/ /success_story/demokratis/ /rails_world_2026/]
vendors = YAML.load_file(root.join("..", "_data", "comparison_vendors.yml"))
comparison_rows = YAML.load_file(root.join("..", "_data", "comparison_rows.yml"))
vendor_keys = vendors.map { |vendor| vendor.fetch("key") }

comparison_rows.each do |row|
  support_keys = row.fetch("support").keys
  errors << "comparison keys do not match vendors for #{row.fetch('key')}" unless support_keys == vendor_keys
end

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

  html.scan(/(?:href|src)=["']([^"']+)["']/).flatten.each do |reference|
    next unless reference.start_with?("/")

    clean = URI.decode_www_form_component(reference.split(/[?#]/, 2).first)
    target = root.join(clean.sub(%r{\A/}, ""))
    next if target.file? || target.join("index.html").file?

    errors << "broken local reference #{reference} in #{path.relative_path_from(root)}"
  end
end

home = root.join("index.html").read
errors << "comparison table must contain 15 yes values" unless home.scan(/alt=["']yes["']/).length == 15
errors << "comparison table must contain 9 no values" unless home.scan(/alt=["']no["']/).length == 9
errors << "terminal animation markup is missing" unless home.include?("data-terminal-command")
errors << "mountain animation markup is missing" unless home.include?("<animateMotion")
errors << "binary animation markup is missing" unless home.include?("data-binary")

abort(errors.uniq.join("\n")) unless errors.empty?
puts "Verified #{Dir[root.join('**', '*.html')].length} HTML files and #{languages.length * routes.length} localized routes"
