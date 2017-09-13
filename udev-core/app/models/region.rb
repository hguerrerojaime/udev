class Region
  include Mongoid::Document

  validates :name, uniqueness: { scope: :domain }

  field :name, type: String
  field :description, type: String

  belongs_to :domain
  has_many :domain_objects

  def self.create(domain,command)

    if command.valid?
      region = Region.new({
        domain: domain,
        name: command.name,
        description: command.description
      })

      if !region.save
        raise ValidationError.new(region.errors);
      end

      region
    else
      raise ValidationError.new(command.errors);
    end
  end

end
