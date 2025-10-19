(function(){
  var SUPABASE_URL = 'https://fweijeloshdakrqupydl.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3ZWlqZWxvc2hkYWtycXVweWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MTk0OTYsImV4cCI6MjA3NjM5NTQ5Nn0.-BgEa8_rQ_RbxzJHKwUCfiRTKxSfZuZYkYtRgg75Fpc';

  function ready(fn){
    if (document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function(){
    if (!window.TMSupa || !TMSupa.init){
      console.warn('Supabase init skipped: TMSupa helper missing.');
      return;
    }
    var client = TMSupa.getClient && TMSupa.getClient();
    if (client){
      return;
    }
    client = TMSupa.init({ url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY });
    if (client){
      window.tmSupabaseConfig = { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY };
    }
  });
})();
