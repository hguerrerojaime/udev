class IndexController < RestController

  def about
    @about = {
        application: "Dynamic Business Application Builder"
    };

    render json: @about;
  end

  

end
