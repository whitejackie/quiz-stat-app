function Header() {
  return (
    <div className="w-full">
      <div className="h-10 bg-black">
        <div className="max-w-336 m-auto">
          <stat-ee-header-apps
            data-app="www"
            data-lang="et"
            className="mx-6 xl:mx-0"
          />
        </div>
      </div>
      <div
        className="h-15.75 lg:h-25 py-1.75 lg:py-2.5 px-7 bg-white lg:top_15px_center
          bg-[radial-gradient(circle_at_1px_1px,#929292_1px,#fff_0)]
          bg-size-[18.8px_18.8px]
          bg-position-[-2px_15px]
          min-[1334px]:bg-position-[top_15px_center]
        "
      >
        <div className="max-w-336 mx-auto">
          <div className="xl:-mx-1">
            <img src="logo.png" className="h-14 bg-white p-2 lg:mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
