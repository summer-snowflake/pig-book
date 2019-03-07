# frozen_string_literal: true

require 'csv'

class Record::Fetcher
  include ActiveModel::Model
  include TimeRangeGenerator

  attr_accessor :date
  attr_reader :records

  def initialize(user:)
    @user = user
  end

  def find_all_by(params)
    init_params(params)

    range = generate_range if @date || @year || @month
    @records = search_records.current_currency(@user)
    @records = @records.where(published_at: range) if range
    @records = @records
               .includes(:category, :place, :breakdown, tagged_records: :tag)
               .order("#{@order}": :desc, created_at: :desc)
    @records = @records.limit(@limit) if @limit
    @records
  end

  def totals
    MonthlyBalanceTable.new(
      user: @user,
      income: @records.income.sum(:charge),
      expenditure: @records.expenditure.sum(:charge),
      point: @records.sum(:point)
    )
  end

  def generate_csv_file
    upload_file(csv_file)
  end

  private

  def init_params(params)
    @date = params[:date]
    @year = params[:year]
    @month = params[:month]
    @limit = params[:limit]
    @order = params[:order] || :published_at

    build_params(params)
  end

  def build_params(params)
    category_id = params[:category_id]
    @category = @user.categories.find(category_id) if category_id
    breakdown_id = params[:breakdown_id]
    @breakdown = @user.breakdowns.find(breakdown_id) if breakdown_id
    @place = @user.places.find(params[:place_id]) if params[:place_id]
  end

  def search_records
    records = @user.records
    records = records.where(category: @category) if @category
    records = records.where(breakdown: @breakdown) if @breakdown
    records = records.where(place: @place) if @place
    records
  end

  def csv_file
    bom = %w[EF BB BF].map { |e| e.hex.chr }.join
    CSV.generate(bom) do |csv|
      @records.includes(:category, :breakdown, :place, :tagged_records)
              .each do |record|
        csv << Record::CsvRow.create(record: record)
      end
    end
  end

  def upload_file(file)
    now = DateTime.now.strftime('%Y%m%d%H%M%S')
    if Rails.env.production?
      bucket = Aws::S3::Resource.new.bucket(ENV['AWS_BUCKET_NAME'])
      object_path = "downloads/#{@user.id}/#{now}.csv"
      object = bucket.object(object_path)
      object.put(body: file)
    else
      file_path = File.join(Rails.root, 'tmp', 'downloads', "#{now}.csv")
      File.open(file_path, 'w:ASCII-8BIT:utf-8') { |f| f.write(file) }
    end
  end
end
