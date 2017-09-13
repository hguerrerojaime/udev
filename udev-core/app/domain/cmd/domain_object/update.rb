module Cmd
  module DomainObject
    class Update
      include ActiveModel::Model

      attr_accessor :description
    end
  end
end
