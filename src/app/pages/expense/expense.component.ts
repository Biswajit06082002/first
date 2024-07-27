import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ExpenseService } from '../../core/services/expense.service';
import { IExpense } from '../../core/models/common.model';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent implements OnInit{
  expenses: IExpense[] = [];
  totalExpense = 0;
  constructor(private expenseService: ExpenseService, private router: Router) {

  }
  ngOnInit(): void {
    this.expenseService.getAllExpenses().snapshotChanges().subscribe({
      next: (data) => {
        this.expenses = [];

        data.forEach((item) => {
          let expense = item.payload.toJSON() as IExpense;
          this.totalExpense += parseFloat(expense.price);
          this.expenses.push({
            key: item.key || '',
            title: expense.title,
            description: expense.description,
            price: expense.price
          });
        })
      }
    })
  }
  editExpense(key: string){
    this.router.navigate(['/expense-form/'+ key]);
  }
  removeExpense(key: string){
    this.expenseService.deleteExpense(key);
  }
}
