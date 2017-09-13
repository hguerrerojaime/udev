class Record
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  field :created_at, type: Time
  field :updated_at, type: Time

  belongs_to :domain_object
  belongs_to :created_by, class_name: "User"
  belongs_to :updated_by, class_name: "User", optional: true

  belongs_to :owner, class_name: "User"

  validates :updated_at, absence: true, on: :create
  validates :updated_by, absence: true, on: :create

  def self.insert(domain_object,data)
    do_data = Record.generate_domain_object_data(domain_object,data)
    record = Record.new(do_data)
    record.domain_object = domain_object
    record.before_create
    if !record.save
      raise ValidationError.new(record.errors)
    end
    record
  end

  def update(data)
    domain_object = self.domain_object
    do_data = Record.generate_domain_object_data(domain_object,data)
    do_data.each do |key,value|
      self[key] = value
    end
    self.before_update
    self.save
    self
  end

  def to_hash
    attrs = self.attributes
    attrs[:id] = self.id.to_s
    attrs[:domain_object] = { id: self.domain_object.id.to_s, name: self.domain_object.class_name, label: domain_object.label }
    attrs[:created_by] = { id: self.created_by.id.to_s, value: self.created_by.token } unless self.created_by.nil?
    attrs[:updated_by] = { id: self.updated_by.id.to_s, value: self.updated_by.token } unless self.updated_by.nil?
    attrs[:owner] = { id: self.owner.id.to_s, value: self.owner.token } unless self.owner.nil?

    attrs
  end

  def before_create
    self.set_sequences
    self.set_created_audit
  end

  def before_update
    self.set_updated_audit
  end

  def set_sequences
    self.domain_object.find_auto_number_fields.each do |field|
       fmt = field.options[:format]
       self[field.name] = sprintf fmt,Counter.get_next_sequence(field)
    end
  end

  def set_created_audit
    user = User.first
    self.created_at = Time.now
    self.created_by = user
    self.owner = user
  end

  def set_updated_audit
    user = User.first
    self.updated_at = Time.now
    self.updated_by = user
  end

  def value
    self.domain_object.lbl_exp.to_s(self.to_hash)
  end

  def to_lookup
    {
      id: self.id.to_s,
      key: self.key,
      value: self.value
    }
  end

  private
  def self.generate_domain_object_data(domain_object,data)
    non_domain_object_fields = data.keys.select { |key|
        !domain_object.find_field_names.include?(key.to_s)
    }

    full_data = data.except(*non_domain_object_fields)
    full_data
  end

end
