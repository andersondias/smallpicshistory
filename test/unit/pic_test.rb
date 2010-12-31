require 'test_helper'

class PicTest < ActiveSupport::TestCase
  test "title validation" do
    pic = Pic.create

    assert pic.invalid?, 'should be invalid without title'
    assert pic.errors[:title], 'should have one error for title'
  end
end
