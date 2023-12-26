import { Component, EventEmitter, OnInit } from '@angular/core';
import { Category } from '../pojo/category';
import { Spend, defaultSpend } from '../pojo/spend';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'find-spend',
  templateUrl: './find-spend.component.html',
  styleUrls: ['./find-spend.component.css']
})
export class FindSpendComponent implements OnInit {

  total: number = 0;
  month: string = '';
  spendCategerizer: number = 1;
  spends: Spend[] = [defaultSpend]
  //spend object that is easy to render
  spendsToRender: SpendRender = { spendMap: new Map<string, { listTotal: number, spendsList: Spend[] }> };
  constructor(private spnSrv: SpendsService) { }

  searchSpecefic() {
    let full = this.getMonthArrFromString(this.month)
    let month = Number(full[0]);
    let year = Number(full[1]);
    this.spnSrv.getSpendsOfMonth(year, month).subscribe((data: Spend[]) => { this.spends = data; this.convertToRenderSpends(); })
    this.getmonthlySpent();
  }

  convertToRenderSpends() {
    let spendsMap: Map<string, { listTotal: number, spendsList: Spend[] }> = new Map();
    switch (Number(this.spendCategerizer)) {
      // display spends by date
      case 2:
        this.spends.forEach(sp => {
          if(spendsMap.has(sp.date.toLocaleString())) {
            let spendsMapValue = spendsMap.get(sp.date.toLocaleString())
            if(spendsMapValue) {
              spendsMapValue.spendsList.push(sp)
              let listTotalUpdated = spendsMapValue.listTotal + sp.money
              spendsMap.set(sp.date.toLocaleString(), {...spendsMapValue,listTotal:listTotalUpdated,spendsList:spendsMapValue.spendsList})
            }
          }
          else {
            spendsMap.set(sp.date.toLocaleString(), {listTotal: sp.money, spendsList:[sp]})
          }
        });
        this.spendsToRender.spendMap = new Map([...spendsMap.entries()].sort())
        break;
      // display spends by category
      case 1:
      default:
        this.spends.forEach(sp => {
          if(spendsMap.has(sp.category.heading)) {
            let spendsMapValue = spendsMap.get(sp.category.heading)
            if(spendsMapValue) {
              spendsMapValue.spendsList.push(sp)
              let listTotalUpdated = spendsMapValue.listTotal + sp.money
              spendsMap.set(sp.category.heading, {...spendsMapValue,listTotal:listTotalUpdated,spendsList:spendsMapValue.spendsList})
            }
          }
          else {
            spendsMap.set(sp.category.heading, {listTotal: sp.money, spendsList:[sp]})
          }
        });
        this.spendsToRender = { spendMap: spendsMap };
        break;
    }
  }

  getMonthArrFromString(month: string) {
    let full = month.split('-');
    return full;
  }

  ngOnInit(): void {
    let now = new Date();
    let currentMonth = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString();
    this.month = this.correctTheMonth(currentMonth);
    this.searchSpecefic();
  }

  getmonthlySpent() {
    let full = this.getMonthArrFromString(this.month);
    this.spnSrv.getMonthlySpent(Number(full[0]), Number(full[1])).subscribe({
      next: (data: number) => { this.total = data },
      error: () => { this.total = 0 }
    });
  }

  // gives month of format yyyy-mm
  correctTheMonth(givenMonth: string) {
    let monthData = this.getMonthArrFromString(givenMonth);
    let returMonth = monthData[0] + '-';
    if ((monthData[1]).length === 1) {
      returMonth += '0'
    }
    returMonth += monthData[1];
    return returMonth;
  }

  navigateMonth(flag: string) {
    let monthToNavigate = '';
    let detailMonth = this.getMonthArrFromString(this.month);
    if (flag == '+') {
      if (parseInt(detailMonth[1]) == 12) {
        monthToNavigate += parseInt(detailMonth[0]) + 1
        monthToNavigate += '-';
        monthToNavigate += '1';
      } else {
        monthToNavigate += detailMonth[0];
        monthToNavigate += '-';
        monthToNavigate += parseInt(detailMonth[1]) + 1
      }
    } else {
      if (parseInt(detailMonth[1]) == 1) {
        monthToNavigate += parseInt(detailMonth[0]) - 1
        monthToNavigate += '-';
        monthToNavigate += '12';
      } else {
        monthToNavigate += detailMonth[0];
        monthToNavigate += '-';
        monthToNavigate += parseInt(detailMonth[1]) - 1
      }
    }
    this.month = this.correctTheMonth(monthToNavigate);
    this.searchSpecefic();
  }
  print() {
    // console.log(this.spendCategerizer)
  }
}

export interface SpendRender {
  spendMap: Map<string, { listTotal: number, spendsList: Spend[] }>;
}