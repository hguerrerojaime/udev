module Cmd
  module DomainObject
    class Create
      include ActiveModel::Model

      attr_accessor :class_name, :label, :plural_label, :record_exp, :description, :key_field_type, :key_field_opts

      validates :class_name, presence: true
      validates :label, presence: true
      validates :plural_label, presence: true
      validates :key_field_type, presence: true, inclusion: { in: %w(TEXT AUTO_NUMBER) }

      def record_exp
         if @record_exp.nil?
           @record_exp = "{key}"
         end
         @record_exp
      end
    end
  end
end
