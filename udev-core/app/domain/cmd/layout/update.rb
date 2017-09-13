module Cmd
  module Layout
    class Update
      include ActiveModel::Model

      attr_accessor :sections

      validates :sections, length: { minimum: 1 }

      def sections_attributes(attributes_list = [])
        @sections ||= []

        attributes_list.each do |i,attributes|
          attributes[:order] = i
          @sections << Section.new(attributes)
        end
      end

    end

    class Section
      include ActiveModel::Model
      attr_accessor :title, :order, :columns

      validates :title, presence: true
      validates :order, presence: true
      validates :columns, length: { minimum: 1 }

      def columns_attributes(attributes_list = [])
        @columns ||= []
        attributes_list.each do |i,attributes|
          attributes[:order] = i
          @columns << Column.new(attributes)
        end
      end
    end

    class Column
      include ActiveModel::Model
      attr_accessor :order, :components

      validates :order, presence: true

      def components_attributes(attributes_list = [])
        @components ||= []
        attributes_list.each do |i,attributes|
          attributes[:order] = i
          @components << Component.new(attributes)
        end
      end

      def components
        @components ||= []
      end
    end

    class Component
      include ActiveModel::Model
      attr_accessor :do_field_id, :order

      validates :order, presence: true

      def do_field
        @do_field ||= DoField.find_by_id self.do_field_id
      end
    end
  end
end
