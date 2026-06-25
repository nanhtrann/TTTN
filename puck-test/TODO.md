# TODO - AboutContent enhancements

- [ ] Update `Info` component UI (admin-aboutContent.jsx):
  - [ ] Add hover effect: `transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer`
  - [x] Add left “bán nguyệt” rounding: use `rounded-l-3xl`
  - [ ] Keep `overflow-hidden` and glassmorphism style


- [ ] Update `paragraph` images rendering data (admin-default-data.js):
  - [x] Add `images: [img1, img2]` for the `VỀ CÂU LẠC BỘ` paragraph


- [ ] Update editor schema (admin-puck-config.jsx):
  - [x] Add `images` field under AboutContent -> paragraph objectFields (array of URLs)


- [ ] Run dev/build and visually verify:
  - [x] Hover/scale/shadow on Info cards (review bằng mắt khi chạy dev)
  - [x] 2 images show under paragraph (review bằng mắt khi chạy dev)


