class Pic < ActiveRecord::Base
  validates :title, :presence => true
  has_attached_file :image, :styles => { :original => ['256x256>', 'jpg'], :thumb => ['75x75!', 'jpg']}

  validates_attachment_presence :image
  validates_attachment_content_type :image, :content_type => ['image/jpeg', 'image/png', 'image/gif']
end
