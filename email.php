

<!DOCTYPE html>

<HTML>

 <HEAD>

  <TITLE></TITLE>

  <META http-equiv="Content-Type" content="text/html;charset=utf-8">

  <META emailE="Author" CONTENT="atging">

  <META emailE="Keywords" CONTENT="">

  <META emailE="Description" CONTENT="">

 

<script language="javascript">

<!--

function viewComment() {

		document.form1.submit();

}

// -->

</script>

  </HEAD>



<BODY>



<div class="main" style="text-align: center;">

<BR>

<?php

$_POST['email'] = preg_replace("/\r/", "", $_POST['email']);

$_POST['email'] = preg_replace("/\n/", "", $_POST['email']);



//$prev_ref_page = htmlspecialchars($_POST['abc123']);

$email = htmlspecialchars($_POST['email']);



//$prev_ref_page = trim($prev_ref_page);

$email = trim($email);



$denyList = array('58.65.239.170', '89.113.78.89', '148.233.159.58', '202.10.69.11', '88.191.37.113', '86.105.181.238', '200.51.41.29', '200.65.127.161', '200.219.152.6', '218.189.236.226', '203.162.2.133', '212.116.219.108', '89.248.160.195', '194.165.130.118', '212.235.92.172', '219.136.240.153', '89.149.244.89');

$numDeny = count($denyList) - 1;



for ( $i = 0; $i <= $numDeny; $i++ ) {

	#echo $_SERVER['REMOTE_ADDR'];

	if ( $_SERVER['REMOTE_ADDR'] == $denyList[$i] ) {

		echo '<form action="http://www.google.com/" emaile="getout" method="GET"> </form>';

		echo '<script type="text/javascript" language="JavaScript"> ';

		echo 'document.getout.submit();' . "\n";

		echo '</script>';

	}

	elseif ( $i == $numDeny ) {

		if ( filter_var($email, FILTER_VALIDATE_EMAIL) ){ //preg_match("/<|>|%|&lt;|&gt;|&amp;lt;|&amp;gt;/", $email) == 0 && strlen($content) < 1024 && strlen($email) < 32 && strlen($content) && strlen($email) && preg_match("/<|>|%|&lt;|&gt;|&amp;lt;|&amp;gt;/", $content) == 0 && $_SERVER['REQUEST_METHOD'] == 'POST' && $id >= 1 && $id <= $last_id && strlen($title) > 0 && preg_match("/^http:\/\/www\.andrewging\.com\//", $prev_ref_page) ) {

			echo "<BR>Thank you for signing up $email!";

			

			$ip_address = $_SERVER['REMOTE_ADDR'];

			$referer = $_SERVER['HTTP_REFERER'];

			$host = gethostbyaddr($ip_address);

			$to = 'farmtocloud@gmail.com';

			$subject = 'Landing Page Mailing List';

			$message = 'Email address = ' . $email;

			$headers = 'From: farmtocloud@gmail.com' . 

				'Reply-To: farmtocloud@gmail.com' . 

				'X-Mailer: PHP/' . phpversion();

			mail( $to, $subject, $message, $headers);

		}

		else {

			echo "<BR>Invalid email address, try again";

		}

	}

}



?>



<br><br>

<a href="index.html">Go back</a> 



</div>

</BODY>

</HTML>

