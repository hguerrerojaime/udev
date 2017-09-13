class User
  include Mongoid::Document
  field :token, type: String

  def self.register
    token = (0...8).map { (65 + rand(26)).chr }.join
    user = User.new({ token:token })
    user.save
    user
  end

end
