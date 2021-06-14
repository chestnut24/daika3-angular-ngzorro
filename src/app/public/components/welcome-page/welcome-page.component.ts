import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../../menu';
import { MenuService } from 'src/app/services/menu.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {


    menu: Observable<Menu[]>;

    BottomNum = 0;

    constructor(
        public menuService: MenuService,
        public router: Router,
    ) { }

    ngOnInit() {
        this.menu = this.menuService.getMenu();

        this.getPing();
        const _this = this;
        window.onresize = () => {
            _this.getPing();
        }
    }

    getPing() {
        const ABox = document.getElementById('widthA');
        if (ABox) {
            const a = (ABox.offsetWidth) / 250;
            const b = parseInt(a.toString());
            this.BottomNum = b;
        }
    }

    goR(data) {
        if (data.children && data.children.length) {
            this.router.navigate([data.children[0].url]);
        } else {
            this.router.navigate([data.url]);
        }
    }

}
