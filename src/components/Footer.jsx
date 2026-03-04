function Footer() {
  return (
    <div className="w-full">
      <div
        className="h-81 md:h-52.5 pt-6 pb-5 px-7 md:px-10 bg-black lg:top_15px_center
          bg-[radial-gradient(circle_at_1px_1px,#929292_1px,#000_0)]
          bg-size-[18.8px_18.8px]
          bg-position-[-2px_15px]
          min-[1334px]:bg-position-[top_15px_center]
        "
      >
        <div className="max-w-336 mx-auto">
          <div className="xl:-mx-1 flex flex-col md:flex-row gap-4.5 md:gap-8">
            <div className="bg-black p-4 md:p-6 text-white flex flex-col md:w-fit">
              <h1 className="font-bold  text-[16px]/[1.125] md:text-xl mb-6">
                Kontaktid
              </h1>
              <a href="tel:+3726259300" className="mb-3 flex gap-2 text-[16px]">
                <svg class="w-4.5 h-4.5">
                  <use href="/src/assets/icons.svg#phone"></use>
                </svg>
                +372 625 9300
              </a>
              <a href="mailto:stat@stat.ee" className="flex gap-2 text-[14px]">
                <svg class="w-4.5 h-4.5">
                  <use href="/src/assets/icons.svg#email"></use>
                </svg>
                stat@stat.ee
              </a>
            </div>
            <div className="bg-black p-4 md:p-6 text-white flex flex-col md:w-fit">
              <h1 className="font-bold text-[16px]/[1.125] md:text-xl mb-6">
                Andmekaitse
              </h1>
              <a className="mb-4 text-[14px]">Andmekaitse</a>
              <a className="text-[14px]">Küpsiste sätted</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
