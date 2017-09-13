module Cmd
  module DoField
    class Create
      include ActiveModel::Model
      attr_accessor :name, :label, :type, :options, :description

      validates :name, presence: true
      validates :label, presence: true
      validates :type, presence: true, inclusion: { in: Enums::FieldType.values }
      validates :options, presence: true
    end
  end
end
