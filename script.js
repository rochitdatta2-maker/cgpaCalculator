(() => {
  const regulationSelect = document.getElementById('regulation');
  const gpaForm = document.getElementById('gpaForm');
  const calculateBtn = document.getElementById('calculateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const resultDiv = document.getElementById('result');

  const weights = {
    "2010": [5,5,5,15,15,20,25,10],
    "2016": [5,5,5,10,15,20,25,15],
    "2022": [5,5,10,10,20,20,20,10]
  };

  function renderForm(){
    gpaForm.innerHTML = '';
    for(let i=1;i<=8;i++){
      const card = document.createElement('div');
      card.className='sem-card';
      card.innerHTML=`
        <label>Semester ${i} GPA:</label>
        <input type="number" step="0.01" min="0" max="4" class="gpa-input" data-sem="${i}" placeholder="e.g. 3.50" required />
      `;
      gpaForm.appendChild(card);
    }
  }

  function calculateCGPA(){
    const reg = regulationSelect.value;
    const w = weights[reg];
    const inputs = gpaForm.querySelectorAll('.gpa-input');
    let total = 0, sum = 0;

    for(let i=0;i<inputs.length;i++){
      const val = parseFloat(inputs[i].value);
      if(isNaN(val)||val<0||val>4){
        alert(`Enter valid GPA (0-4) for semester ${i+1}`);
        return;
      }
      sum += val*w[i];
      total += w[i];
    }

    const cgpa = sum/total;
    let grade='';
    if(cgpa>=3.6) grade='A+';
    else if(cgpa>=3.2) grade='A';
    else if(cgpa>=2.8) grade='A-';
    else if(cgpa>=2.25) grade='B+';
    else grade='F';

    resultDiv.innerHTML=`
      <div class="cgpa">CGPA: ${cgpa.toFixed(2)} | Grade: ${grade}</div>
      <div>Regulation: ${reg}</div>
      <div>Approx. Percentage: ${(cgpa/4*100).toFixed(1)}%</div>
    `;
  }

  function resetForm(){
    renderForm();
    resultDiv.innerHTML='';
  }

  regulationSelect.addEventListener('change', resetForm);
  calculateBtn.addEventListener('click', (e)=>{ e.preventDefault(); calculateCGPA(); });
  resetBtn.addEventListener('click', (e)=>{ e.preventDefault(); resetForm(); });

  renderForm();
})();
