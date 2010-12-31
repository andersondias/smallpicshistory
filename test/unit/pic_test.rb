require 'test_helper'

class PicTest < ActiveSupport::TestCase
  test "title validation" do
    pic = Pic.create
    pic.valid?

    assert pic.errors[:title].present?, 'should have one error for title'
  end

  test 'attachment validation' do
    pic = Pic.create
    pic.valid?

    assert pic.errors[:image_file_name].present?, 'should have one error for image attachment'
  end
end
