class CreatePics < ActiveRecord::Migration
  def self.up
    create_table :pics do |t|
      t.string :title
      t.date :when
      t.string :where
      t.text :description

      t.timestamps
    end
  end

  def self.down
    drop_table :pics
  end
end
