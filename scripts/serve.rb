#!/usr/bin/env ruby

require "webrick"

REDIRECTS = {
  "/claude_skill" => "https://github.com/ninech/deploio-skills",
  "/claude_skill/" => "https://github.com/ninech/deploio-skills",
  "/terms" => "https://docs.nine.ch/docs/legal-documents/general-terms-and-conditions/",
  "/terms/" => "https://docs.nine.ch/docs/legal-documents/general-terms-and-conditions/"
}.freeze

class SiteServlet < WEBrick::HTTPServlet::FileHandler
  def service(request, response)
    location = REDIRECTS[request.path]
    if location && %w[GET HEAD].include?(request.request_method)
      response.status = 301
      response["Location"] = location
      response.body = ""
      return
    end

    super
  rescue WEBrick::HTTPStatus::NotFound
    response.status = 404
    response["Content-Type"] = "text/html; charset=utf-8"
    response.body = request.request_method == "HEAD" ? "" : File.binread(File.join(@root, "404.html"))
  end
end

site_root = File.expand_path("../_site", __dir__)
server = WEBrick::HTTPServer.new(
  BindAddress: "0.0.0.0",
  Port: ENV.fetch("PORT", "3000").to_i
)
server.mount "/", SiteServlet, site_root, FancyIndexing: false

%w[INT TERM].each { |signal| trap(signal) { server.shutdown } }
server.start
