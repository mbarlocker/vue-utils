# apexchart

This library is a single Vue component that displays an [apexchart](https://apexcharts.com/)
and keep it updated as options changed.

## Usage

```typescript
import ApexChart from '@mbarlocker/vue-utils/apexchart'

export default defineComponent({
	components: {
		ApexChart,
	},
	setup: () => {
		const chartOptions = {
			...
		}

		return {
			chartOptions,
		}
	}
})
```

```html
<ApexChart :options="chartOptions" />
```
