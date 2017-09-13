class DomainObject
  include Mongoid::Document

  field :class_name, type: String
  field :label, type: String
  field :plural_label, type: String
  field :record_exp, type: String
  field :description, type: String

  belongs_to :region

  has_many :do_fields
  has_many :layouts

  validates :record_exp, presence: true
  validates :class_name, uniqueness: { scope: :region }

  def self.create(region,command)

    if command.valid?

      domain_object = DomainObject.new({
         region: region,
         class_name: "#{command.class_name}__c",
         label: command.label,
         plural_label: command.plural_label,
         record_exp: command.record_exp,
         description: command.description
      })

      if !domain_object.save
        raise ValidationError.new(domain_object.errors)
      end

      self.create_base(domain_object,command)

      domain_object
    else
      raise ValidationError.new(command.errors)
    end
  end

  def self.create_base(domain_object,command)
    DoField.create(domain_object,Cmd::DoField::Create.new({
      name: "key",
      label: "Key",
      description: "Record Key",
      type: command.key_field_type,
      options: command.key_field_opts
    }),false)

    Layout.create(domain_object,Cmd::Layout::Create.new({
      name: "#{domain_object.class_name}_Base_Layout"
    }))
  end

  def key_field
    self.do_fields.find_by name: "key" unless self.do_fields.nil?
  end

  def find_auto_number_fields
     self.do_fields.where(type:"AUTO_NUMBER") unless self.do_fields.nil?
  end

  def find_non_auto_number_fields
     self.do_fields.where( :type.ne => "AUTO_NUMBER") unless self.do_fields.nil?
  end

  def find_field_names
     self.do_fields.collect { |f| f.name } unless self.do_fields.nil?
  end

  def lbl_exp
    @lbl_exp ||= Expr::Label.new(self.record_exp)
  end

  def record_exp
    self[:record_exp] ||= "@obj.key"
  end

end
