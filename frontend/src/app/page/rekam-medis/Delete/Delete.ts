import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import RekamMedisService from '../../../api/rekammedis';
import { RekammedisStore } from '../List/hook/rekammedis.store';

@Component({
  selector: 'app-delete',
  standalone: true,
  template: `
    <button type="button" class="btn btn-danger" (click)="handleDelete()">Hapus</button>
  `,
  styleUrl: './Delete.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Delete {
  @Input() id: string = '';

  constructor(
    private rekammedisService: RekamMedisService,
    public rekammedisStore: RekammedisStore
  ) {}

  handleDelete() {
    if (!confirm('Yakin ingin menghapus rekam medis ini?')) return;

    this.rekammedisService.deleteRekamMedis(this.id, {
      onSuccess: () => {
        this.rekammedisStore.fetchRekamMedis();
        alert('Data berhasil dihapus');
      },
      onError: (err) => {
        alert('Gagal menghapus: ' + err);
      },
    });
  }
}
