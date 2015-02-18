<?php

	error_reporting(0);

    $server_path = './';

    

    // Defining the basic scraping function

    function scrape_between($data, $start, $end){

        $data = stristr($data, $start); // Stripping all data from before $start

        $data = substr($data, strlen($start));  // Stripping $start

        $stop = stripos($data, $end);   // Getting the position of the $end of the data to scrape

        $data = substr($data, 0, $stop);    // Stripping all data from after and including the $end of the data to scrape

        return $data;   // Returning the scraped data from the function

    }

    // Defining the basic cURL function

    function curl($url) {

        // Assigning cURL options to an array

        $options = Array(

            CURLOPT_RETURNTRANSFER => TRUE,  // Setting cURL's option to return the webpage data

            CURLOPT_FOLLOWLOCATION => TRUE,  // Setting cURL to follow 'location' HTTP headers

            CURLOPT_AUTOREFERER => TRUE, // Automatically set the referer where following 'location' HTTP headers

            CURLOPT_CONNECTTIMEOUT => 120,   // Setting the amount of time (in seconds) before the request times out

            CURLOPT_TIMEOUT => 120,  // Setting the maximum amount of time for cURL to execute queries

            CURLOPT_MAXREDIRS => 10, // Setting the maximum number of redirections to follow

            CURLOPT_USERAGENT => "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1a2pre) Gecko/2008073000 Shredder/3.0a2pre ThunderBrowse/3.2.1.8",  // Setting the useragent

            CURLOPT_URL => $url, // Setting cURL's URL option with the $url variable passed into the function

        );

         

        $ch = curl_init();  // Initialising cURL

        curl_setopt_array($ch, $options);   // Setting cURL's options using the previously assigned array data in $options

        $data = curl_exec($ch); // Executing the cURL request and assigning the returned data to the $data variable

        curl_close($ch);    // Closing cURL

        return $data;   // Returning the data from the function

    }

	$continue = TRUE;   // Assigning a boolean value of TRUE to the $continue variable

     

    $url = "http://www.101livestock.com/market-report.html";    // Assigning the URL we want to scrape to the variable $url

     

    // While $continue is TRUE, i.e. there are more search results pages

	$outfilename = 'database.csv';

    $outputFile = fopen($outfilename,"w");

	while ($continue == TRUE) {

         

        $results_page = curl($url); // Downloading the results page using our curl() function

        $steers_page = scrape_between($results_page, "Steers</span>", "Heifers</span>"); // Scraping out only the middle section of the results page that contains our results

		$heifers_page = scrape_between($results_page, "Heifers</span>", "Slaughter Cows</span>");

		$slaughtercows_page = scrape_between($results_page, "Slaughter Cows</span>", "Slaughter Bulls</span>");

		$slaughterbulls_page = scrape_between($results_page, "Slaughter Bulls</span>", "</table>");

		$got_steers = preg_match_all('/(?<=\>)<td style=".{0,32}">.{0,10}<\/td>/', $steers_page, $steer);

		$got_heifers = preg_match_all('/(?<=\>)<td style=".{0,32}">.{0,10}<\/td>/', $heifers_page, $heifer);

		$got_slaughtercows = preg_match_all('/(?<=\>)<td style=".{0,32}">.{0,13}<\/td>/', $slaughtercows_page, $slaughtercows);

		$got_slaughtercows = preg_match_all('/(?<=\>)<td style=".{0,32}">.{0,13}<\/td>/', $slaughterbulls_page, $slaughterbulls);

		fwrite($outputFile, date("Y-m-d H:i:s", time()) . ",UTC\n");

		fwrite($outputFile, "source,$url\n");

		fwrite($outputFile, "Steers [lb],Low [$],High [$]\n");

		$count = 0;

		foreach($steer[0] as $key => $value){

			$count++;

			$extracted = preg_match('/(?<=\>)[0-9-\.]+/',$value,$value);

			fwrite($outputFile, $value[0] . ',');

			if ($count %3 == 0)

				fwrite($outputFile, "\n");

		}

		fwrite($outputFile, "\nHeifers [lb],Low [$],High [$]\n");

		$count = 0;

		foreach($heifer[0] as $key => $value){

			$count++;

			$extracted = preg_match('/(?<=\>)[0-9-\.]+/',$value,$value);

			fwrite($outputFile, $value[0] . ',');

			if ($count %3 == 0)

				fwrite($outputFile, "\n");

		}

		fwrite($outputFile, "\nSlaughter Cows,Low [$],High [$]\n");

		$count = 0;

		foreach($slaughtercows[0] as $key => $value){

			$count++;

			$extracted = preg_match('/(?<=\>)[a-z\sA-Z0-9-\.]+/',$value,$value);

			fwrite($outputFile, $value[0] . ',');

			if ($count %3 == 0)

				fwrite($outputFile, "\n");

		}

		fwrite($outputFile, "\nSlaughter Bulls,Low [$],High [$]\n");

		$count = 0;

		foreach($slaughterbulls[0] as $key => $value){

			$count++;

			$extracted = preg_match('/(?<=\>)[a-z\sA-Z0-9-\.]+/',$value,$value);

			fwrite($outputFile, $value[0] . ',');

			if ($count %3 == 0)

				fwrite($outputFile, "\n");

		}

			$continue = FALSE;

    }

	fclose($outputFile);

	echo $server_path.'database.csv';

?>



