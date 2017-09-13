module Cmd
  module Region
    class Create
      include ActiveModel::Model
      attr_accessor :name, :description
      validates :name, presence: true
    end
  end
end
