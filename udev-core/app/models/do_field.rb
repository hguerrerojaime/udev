class DoField
  include Mongoid::Document


  field :name, type: String
  field :label, type: String
  field :type, type: String
  field :opts, type: Hash
  field :description, type: String

  belongs_to :domain_object

  validates :name, uniqueness: { scope: :domain_object }

  def self.create(domain_object,command,custom = true)

    if command.valid?

        suffix = custom ? "__c" : ""

        do_field = DoField.new({
            domain_object: domain_object,
            name: "#{command.name}#{suffix}",
            label: command.label,
            type: command.type,
            opts: command.options,
            description: command.description
        })

        if !do_field.save
          raise ValidationError.new(do_field.errors)
        end

        do_field
    else
      raise ValidationError.new(command.errors)
    end

  end

  def to_hash
    self.attributes
  end



end
