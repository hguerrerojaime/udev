class Counter
  include Mongoid::Document

  @@lock = Mutex.new

  field :seq, type: Integer
  validates :do_field, uniqueness: true, presence: true
  belongs_to :do_field

  def self.get_next_sequence(do_field)

    @@lock.synchronize do
      opts = do_field.options
      opts["initial_value"] = 1 if opts["initial_value"].nil?
      counter = Counter.find_or_initialize_by(do_field:do_field)

      if counter.seq.nil?
        counter.seq = opts["initial_value"]
      else
        counter.seq += 1
      end
      counter.save
      counter.seq

    end
  end

  def self.get_current_sequence(do_field)
    counter = Counter.find_by(do_field:do_field)
    return counter.nil? ? 0 : counter.seq
  end
end
