class PagesController < ApplicationController

  
  def click
  end

  def swipe
  end

  def grab
  end


  def page
    begin
      render params[:page]
    rescue ActionView::MissingTemplate => e
      redirect_to root_path, notice: {warning: 'Book not found'}
    end
  end
end
