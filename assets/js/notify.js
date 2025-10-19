(function(){
  if (typeof Swal === 'undefined') {
    console.warn('Notify: SweetAlert2 not found. Include https://cdn.jsdelivr.net/npm/sweetalert2@11 first.');
    window.Notify = {
      toastSuccess: (t)=>console.log('SUCCESS:', t),
      toastError: (t)=>console.warn('ERROR:', t),
      toastInfo: (t)=>console.info('INFO:', t),
      toastWarn: (t)=>console.warn('WARN:', t),
      alertSuccess: (t,tx)=>alert((t||'Berhasil')+'\n'+(tx||'')),
      alertError: (t,tx)=>alert((t||'Gagal')+'\n'+(tx||'')),
      alertInfo: (t,tx)=>alert((t||'Info')+'\n'+(tx||'')),
      alertWarn: (t,tx)=>alert((t||'Perhatian')+'\n'+(tx||'')),
      confirm: async (t,tx)=>({ isConfirmed: confirm((t||'Yakin?')+'\n'+(tx||'')) })
    };
    return;
  }
  const TOAST_Z = 1600;
  function adjustToastPosition(toast){
    try {
      const container = toast?.parentElement;
      if (!container) return;
  const header = document.querySelector('header.tm-auto-hide-header') || document.querySelector('header.tm-checkout-header');
      const headerHeight = header ? Math.round(header.getBoundingClientRect().height) : 0;
      const offset = Math.max(headerHeight + 16, 16);
      container.style.zIndex = String(TOAST_Z);
      container.style.top = offset + 'px';
      container.style.right = '16px';
    } catch {}
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      adjustToastPosition(toast);
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  function toast(icon, title){ Toast.fire({ icon, title }); }
  function alert(icon, title, text){ return Swal.fire({ icon, title: title||'', text: text||'' }); }
  function confirm(title, text, confirmText){
    return Swal.fire({
      title: title || 'Apakah Anda yakin?',
      text: text || '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmText || 'Ya',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#16a34a',
    });
  }

  window.Notify = {
    toastSuccess: (t)=>toast('success', t||'Berhasil'),
    toastError: (t)=>toast('error', t||'Terjadi kesalahan'),
    toastInfo: (t)=>toast('info', t||'Info'),
    toastWarn: (t)=>toast('warning', t||'Perhatian'),
    alertSuccess: (t,tx)=>alert('success', t||'Berhasil', tx),
    alertError: (t,tx)=>alert('error', t||'Gagal', tx),
    alertInfo: (t,tx)=>alert('info', t||'Info', tx),
    alertWarn: (t,tx)=>alert('warning', t||'Perhatian', tx),
    confirm
  };
})();
