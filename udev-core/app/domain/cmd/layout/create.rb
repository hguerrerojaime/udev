module Cmd
  module Layout
    class Create
      include ActiveModel::Model
      attr_accessor :name
      validates :name, :format => { :with => /[a-z0-9_-]{3,15}/ }
    end
  end
end
