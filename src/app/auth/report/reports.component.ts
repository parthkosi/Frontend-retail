import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {
  prReport: any[] = [];
  stockReport: any[] = [];

  // UI states
  loadingPR = false;
  loadingStock = false;
  errorMessage = '';

  constructor(private reportsService: ReportsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  // PR LIFECYCLE REPORT
  loadPRReport(): void {
    this.resetState();
    this.loadingPR = true;

    this.reportsService.getPrLifecycle().subscribe({
      next: (res) => {
        this.prReport = [...res];
        this.loadingPR = false;

        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingPR = false;
      },
    });
  }

  // STOCK BATCH-WISE REPORT
  loadStockReport(): void {
    this.resetState();
    this.loadingStock = true;

    this.reportsService.getStockBatchWise().subscribe({
      next: (res) => {
        this.stockReport = [...res];
        this.loadingStock = false;

        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingStock = false;
      },
    });
  }

  // HELPER
  private resetState(): void {
    this.prReport = [];
    this.stockReport = [];
  }
}
