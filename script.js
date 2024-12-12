document.getElementById('simulateBtn').addEventListener('click', simulateQoS);

function simulateQoS() {
  const serviceClass = document.getElementById('serviceClass').value;
  const dataRate = parseInt(document.getElementById('dataRate').value);
  const delay = parseInt(document.getElementById('delay').value);
  const jitter = parseInt(document.getElementById('jitter').value);

  const output = document.getElementById('output');
  output.innerHTML = `
    <p><strong>Service Class:</strong> ${serviceClass}</p>
    <p><strong>Data Rate:</strong> ${dataRate} Kbps</p>
    <p><strong>Delay:</strong> ${delay} ms</p>
    <p><strong>Jitter:</strong> ${jitter} ms</p>
  `;

  updateChart(serviceClass, dataRate, delay, jitter);
}

let chartInstance = null;

function updateChart(serviceClass, dataRate, delay, jitter) {
  const ctx = document.getElementById('bandwidthChart').getContext('2d');

  const data = {
    labels: ['Data Rate (Kbps)', 'Delay (ms)', 'Jitter (ms)'],
    datasets: [{
      label: `QoS Metrics for ${serviceClass}`,
      data: [dataRate, delay, jitter],
      backgroundColor: ['#3498db', '#e74c3c', '#f1c40f'],
      borderColor: ['#2980b9', '#c0392b', '#f39c12'],
      borderWidth: 1
    }]
  };

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
