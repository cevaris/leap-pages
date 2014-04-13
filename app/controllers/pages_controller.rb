class PagesController < ApplicationController

  def click
  end

  def swipe
  end

  def grab
  end


  def page
    render params[:page]
  end
end
