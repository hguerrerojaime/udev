class RestController < ApplicationController

  before_action :parse_body

  def parse_body

     json = request.body.read;

     unless json == ""
       @body = JSON.parse(json);
     end

  end

end
