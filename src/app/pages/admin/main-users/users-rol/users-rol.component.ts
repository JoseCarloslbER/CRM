import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, Subscription } from 'rxjs';
import { UpdateComponentsService } from 'app/shared/services/updateComponents.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-users-rol',
  templateUrl: './users-rol.component.html',
})
export class UsersRolComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();
  private updateSubscription: Subscription;

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'name',
    'acciones'
  ];

  constructor(
    private moduleServices: AdminService,
    private notificationService: OpenModalsService,
    private updateService: UpdateComponentsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateSubscription = this.updateService.updateEvent$.subscribe(() => {
      this.getDataTable();
    });
    this.getDataTable();
  }

  getDataTable() {
    this.moduleServices.getDataTableRoles().subscribe({
      next: (data:any) => {
        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => console.error(error)
    })
  }

  editData(id:string) {
    this.router.navigateByUrl(`/home/admin/editar-rol/${id}`)
  }

  deleteData(id: string) {
    this.notificationService
    .notificacion(
      'Pregunta',
      '¿Estás seguro de eliminar el registro?',
      'question',
    )
    .afterClosed()
    .subscribe((response) => {
      if (response) {
        this.moduleServices.deleteDataRol(id).subscribe({
          next: () => {
              this.notificationService
              .notificacion(
                'Éxito',
                'Registro eliminado.',
                'delete',
              )
              .afterClosed()
              .subscribe((_) => this.getDataTable());
          },
          error: (error) => console.error(error)
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
