import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Breadcrumbs } from "../../../models/breadcrumbs.class";
import { ChiTietKhachHang } from "../../../models/khach-hang.class";
import { UserService } from "./../../../services/user.service";
@Component({
  selector: "app-chi-tiet-khach-hang",
  templateUrl: "./chi-tiet-khach-hang.component.html",
  styleUrls: ["./chi-tiet-khach-hang.component.scss"],
})
export class ChiTietKhachHangComponent implements OnInit {
  breadcrumbs: Breadcrumbs[] = [];
  public cifNumber: string = "";
  public chiTietKhachHang: ChiTietKhachHang = null;
  constructor(
    public activatedRoute: ActivatedRoute,
    public khachHangService: UserService,
    public router: Router
  ) {}
  indexTab = 0;
  ngOnInit(): void {
    this.handleParams();
  }
  paramsObject;
  handleParams = () => {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      this.cifNumber = this.paramsObject.params.cifNumber;
      this.getChiTietKhachHang();
      this.breadcrumbs = [
        {
          name: "Home",
          route: "",
          params: null,
          active: false,
        },
        {
          name: "Danh sách khách hàng",
          route: "/khach-hang/danh-sach-khach-hang",
          params: null,
          active: false,
        },
        {
          name: "Chi tiết khách hàng",
          route: "/khach-hang/chi-tiet-khach-hang",
          params: {
            cifNumber: this.cifNumber,
          },
          active: true,
        },
      ];
    });
  };

  handleChange(event) {
    this.indexTab = event.index;
  }

  getChiTietKhachHang() {
    this.khachHangService
      .getChiTietKhachHang(this.cifNumber)
      .subscribe((response) => {
        console.log("response", response);
        this.chiTietKhachHang = response.data;
      }),
      (error) => {
        console.log("error", error);
      };
  }
}
