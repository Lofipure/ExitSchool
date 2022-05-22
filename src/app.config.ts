export default defineAppConfig({
  appId: "wxefe5d9c683c6d7e7",
  pages: [
    "pages/Home/index",
    "pages/Mine/index",
    "pages/VacationDetail/index",
    "pages/VacationList/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#3CB271",
    navigationBarTitleText: "我在校外挺好的",
    navigationBarTextStyle: "white"
  },
  tabBar: {
    color: "#333333",
    selectedColor: "#3CB271",
    backgroundColor: "#ffffff",
    borderStyle: "white",
    list: [
      {
        pagePath: "pages/Home/index",
        text: "首页",
        iconPath: "assets/images/home.png",
        selectedIconPath: "assets/images/home_selected.png"
      },
      {
        pagePath: "pages/Mine/index",
        text: "我的",
        iconPath: "assets/images/user.png",
        selectedIconPath: "assets/images/user_selected.png"
      }
    ]
  }
});
