

module Expr
  class Label
    def initialize(exp)
      @exp = exp
    end

    def to_s(obj)
       string = @exp

       fields = @exp.scan(/(?<=\:)([A-Za-z_]+[0-9]?)(?=\s|$)/).flatten.uniq.each do |field|
          string = string.gsub ":#{field}", obj[field]
       end

       string
    end
  end
end
