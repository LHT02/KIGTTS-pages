<?php
header('Content-Type: application/octet-stream');
header('Cache-Control: public, max-age=86400');
header('Access-Control-Allow-Origin: *');

$ctx = stream_context_create(['http' => ['timeout' => 60, 'follow_location' => true]]);
$fh = fopen('https://raw.githubusercontent.com/KigScope/KIGTTS-pages/main/public/bxzm.data', 'rb', false, $ctx);

if ($fh) {
    fpassthru($fh);
    fclose($fh);
} else {
    http_response_code(502);
    echo 'Model proxy failed';
}
