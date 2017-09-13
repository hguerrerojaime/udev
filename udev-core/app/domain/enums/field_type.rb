module Enums
  class FieldType
      include Ruby::Enum

      define :AUTO_NUMBER, "AUTO_NUMBER"
      define :TEXT, "TEXT"
      define :TEXT_AREA, "TEXT_AREA"
      define :RICH_TEXT, "RICH_TEXT"
      define :EMAIL, "EMAIL"
      define :CHECKBOX, "CHECKBOX"
      define :PHONE, "PHONE"
      define :NUMBER, "NUMBER"
      define :CURRENCY, "CURRENCY"
      define :DATE, "DATE"
      define :DATETIME, "DATETIME"
      define :TIMESTAMP, "TIMESTAMP"
      define :SELECT, "SELECT"
      define :SELECT_MULTIPLE, "SELECT_MULTIPLE"
      define :SELECT_TAGS, "SELECT_TAGS"
      define :LOOKUP, "LOOKUP"
      define :DETAIL, "DETAIL"
      define :SUMMARY, "SUMMARY"
      define :RECIPIENT_POOL, "RECIPIENT_POOL"
  end
end
