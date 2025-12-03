import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  signal,
  EventEmitter,
} from '@angular/core';
import { Dialog } from '../../../common/components/dialog/dialog';
import RekamMedisService from '../../../api/rekammedis';
import { RekamMedisModel } from '../../../api/rekammedis/model';
@Component({
  selector: 'app-detail',
  imports: [Dialog],
  template: `
    <app-dialog title="Detail Rekam Medis" [(opened)]="opened" (closed)="onClosed()">
      @if (getState.loading) {
      <div class="loading">
        <p>Loading data...</p>
      </div>
      } @else {
      <div class="detail-wrapper">
        <h3 class="section-title">Detail Rekam Medis Pasien</h3>

        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{{ id || '-' }}</td>
            </tr>
            <tr>
              <th>Nama Pasien</th>
              <td>{{ getState.rekammedis.pasien?.nama || '-' }}</td>
            </tr>
            <tr>
              <th>Diagnosa</th>
              <td>{{ getState.rekammedis.diagnosa || '-' }}</td>
            </tr>
            <tr>
              <th>Keluhan</th>
              <td>{{ getState.rekammedis.keluhan || '-' }}</td>
            </tr>
            <tr>
              <th>Catatan</th>
              <td>{{ getState.rekammedis.catatan || '-' }}</td>
            </tr>
            <tr>
              <th>Resep</th>
              <td>{{ getState.rekammedis.resep || '-' }}</td>
            </tr>
            <tr>
              <th>Berat Badan</th>
              <td>{{ getState.rekammedis.beratBadan || '-' }} kg</td>
            </tr>
            <tr>
              <th>Suhu Badan</th>
              <td>{{ getState.rekammedis.suhuBadan || '-' }} °C</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>
                <span [class.active]="getState.rekammedis.isActive">
                  {{ getState.rekammedis.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
            </tr>
            <tr>
              <th>Dibuat</th>
              <td>{{ formatDate(getState.rekammedis.createdAt) || '-' }}</td>
            </tr>
            <tr>
              <th>Diupdate</th>
              <td>{{ formatDate(getState.rekammedis.updatedAt) || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      }
    </app-dialog>
  `,
  styleUrl: './Detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Detail {
  @Input() opened = false;
  @Input() id: string = '';
  @Output() openedChange = new EventEmitter<boolean>();
  state = signal({
    rekammedis: {} as RekamMedisModel,
    loading: false,
  });

  constructor(private rekammedisService: RekamMedisService) {}

  ngOnChanges() {
    if (this.id && this.opened) {
      this.loadDetail();
    }
  }
  get getState() {
    return this.state();
  }

  formatDate(dateString: Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  async loadDetail() {
    this.state.update((prev) => ({
      ...prev,
      loading: true,
    }));

    this.rekammedisService.getRekamMedisById(this.id, {
      onSuccess: (data) => {
        this.state.update((prev) => ({
          ...prev,
          loading: false,
          rekammedis: data,
        }));
      },
      onError: (err) => {
        this.state.update((prev) => ({
          ...prev,
          loading: false,
        }));
        alert(err);
      },
    });
  }

  onClosed() {
    this.opened = false;
    this.openedChange.emit(false);
  }
}
