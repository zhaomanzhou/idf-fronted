import request from 'umi-request';
import _mock from '@/pages/dashboard/_mock';

export async function fakeChartData() {
    return _mock['GET  /api/fake_chart_data'];
}
