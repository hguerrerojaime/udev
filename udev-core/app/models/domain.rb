class Domain
  include Mongoid::Document

  validates :name, uniqueness: true, presence: true
  validates :owner, presence:true

  field :name, type: String

  belongs_to :owner, class_name: 'User'
  has_many :regions

  def self.register(name,owner)
    domain = Domain.new({ name:name,owner:owner })

    domain.save

    domain.regions << Region.new({
        name: "DEV",
        description: "Development"
    })

    domain
  end

end
