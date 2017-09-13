class Layout
  include Mongoid::Document

  belongs_to :domain_object

  field :name, type: String
  field :sections, type: Array

  validates :name, uniqueness: { scope: :domain_object }

  def self.create(domain_object,command)
    if command.valid?
      layout = Layout.new({
          domain_object: domain_object,
          name: command.name
      })
      layout.sections = self.create_base_body(domain_object)

      if !layout.save
        raise ValidationError.new(layout.errors)
      end

      layout
    else
      raise ValidationError.new(command.errors)
    end
  end

  def update(command)
    if command.valid?
      self.sections = command.sections

      if !self.save
        raise new ValidationError.new(self.errors)
      end

      self
    else
      raise ValidationError.new(command.errors)
    end
  end

  def to_hash
    {
      _id: self.id,
      name: self.name,
      domain_object: {
        _id: self.domain_object.id,
        class_name: self.domain_object.class_name,
        label: self.domain_object.label
      },
      sections: self.sections.collect { |s|
         {
           order: s[:order],
           title: s[:title],
           columns: s[:columns].collect { |c|

             components = !c[:components].nil? ? c[:components].collect { |cmp|
               {
                 order: cmp[:order],
                 field: DoField.find(cmp[:field_id]).to_hash
               }
             } : []

             {
               order: c[:order],
               components: components
             }
           }
         }
      }
    }
  end

  def layout_fields
    field_ids = self.sections.collect { |s|
      s[:columns]
    }.flatten.collect { |c|
      c[:components]
    }.flatten.compact.collect { |cmp|
       cmp[:do_field_id]
    }.compact

    DoField.find(field_ids)
  end



  private
  def self.create_base_body(domain_object)
    [
      {
        order: 0,
        title:"#{domain_object.label} data",
        columns: [
          {
            order:0,
            components: [
              {
                order: 0,
                field_id: domain_object.key_field.id
              }
            ]
          }
        ]
      }
    ]
  end

end
