class Pic < ActiveRecord::Base
  validates :title, :presence => true
end
