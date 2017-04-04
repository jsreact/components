<?php

$resp = [
  'total' => 50000,
  'page' => 1,
  'data' => [
    [
      'first_name' => 'Airi',
      'last_name' => 'Satou',
      'title' => 'Accountant',
      'city' => 'Tokyo',
      'date' => '28th Nov 08',
      'amount' => '$162,700'
    ],
    [
      'first_name' => 'Angelica',
      'last_name' => 'Ramos',
      'title' => 'Chief Executive Officer (CEO)',
      'city' => 'London',
      'date' => '9th Oct 09',
      'amount' => '$1,200,000'
    ],
    [
      'first_name' => 'Ashton',
      'last_name' => 'Cox',
      'title' => 'Junior Technical Author',
      'city' => 'San Francisco',
      'date' => '12th Jan 09',
      'amount' => '$86,000'
    ],
    [
      'first_name' => 'Bradley',
      'last_name' => 'Greer',
      'title' => 'Software Engineer',
      'city' => 'London',
      'date' => '13th Oct 12',
      'amount' => '$132,000'
    ],
    [
      'first_name' => 'Brenden',
      'last_name' => 'Wagner',
      'title' => 'Software Engineer',
      'city' => 'San Francisco',
      'date' => '7th Jun 11',
      'amount' => '$206,850'
    ],
    [
      'first_name' => 'Brielle',
      'last_name' => 'Williamson',
      'title' => 'Integration Specialist',
      'city' => 'New York',
      'date' => '2nd Dec 12',
      'amount' => '$372,000'
    ],
    [
      'first_name' => 'Bruno',
      'last_name' => 'Nash',
      'title' => 'Software Engineer',
      'city' => 'London',
      'date' => '3rd May 11',
      'amount' => '$163,500'
    ],
    [
      'first_name' => 'Caesar',
      'last_name' => 'Vance',
      'title' => 'Pre-Sales Support',
      'city' => 'New York',
      'date' => '12th Dec 11',
      'amount' => '$106,450'
    ],
    [
      'first_name' => 'Cara',
      'last_name' => 'Stevens',
      'title' => 'Sales Assistant',
      'city' => 'New York',
      'date' => '6th Dec 11',
      'amount' => '$145,600'
    ],
    [
      'first_name' => 'Cedric',
      'last_name' => 'Kelly',
      'title' => 'Senior Javascript Developer',
      'city' => 'Edinburgh',
      'date' => '29th Mar 12',
      'amount' => '$433,060'
    ],
    [
      'first_name' => 'Airi',
      'last_name' => 'Satou',
      'title' => 'Accountant',
      'city' => 'Tokyo',
      'date' => '28th Nov 08',
      'amount' => '$162,700'
    ],
    [
      'first_name' => 'Angelica',
      'last_name' => 'Ramos',
      'title' => 'Chief Executive Officer (CEO)',
      'city' => 'London',
      'date' => '9th Oct 09',
      'amount' => '$1,200,000'
    ],
    [
      'first_name' => 'Ashton',
      'last_name' => 'Cox',
      'title' => 'Junior Technical Author',
      'city' => 'San Francisco',
      'date' => '12th Jan 09',
      'amount' => '$86,000'
    ],
    [
      'first_name' => 'Bradley',
      'last_name' => 'Greer',
      'title' => 'Software Engineer',
      'city' => 'London',
      'date' => '13th Oct 12',
      'amount' => '$132,000'
    ],
    [
      'first_name' => 'Brenden',
      'last_name' => 'Wagner',
      'title' => 'Software Engineer',
      'city' => 'San Francisco',
      'date' => '7th Jun 11',
      'amount' => '$206,850'
    ],
    [
      'first_name' => 'Brielle',
      'last_name' => 'Williamson',
      'title' => 'Integration Specialist',
      'city' => 'New York',
      'date' => '2nd Dec 12',
      'amount' => '$372,000'
    ],
    [
      'first_name' => 'Bruno',
      'last_name' => 'Nash',
      'title' => 'Software Engineer',
      'city' => 'London',
      'date' => '3rd May 11',
      'amount' => '$163,500'
    ],
    [
      'first_name' => 'Caesar',
      'last_name' => 'Vance',
      'title' => 'Pre-Sales Support',
      'city' => 'New York',
      'date' => '12th Dec 11',
      'amount' => '$106,450'
    ],
    [
      'first_name' => 'Cara',
      'last_name' => 'Stevens',
      'title' => 'Sales Assistant',
      'city' => 'New York',
      'date' => '6th Dec 11',
      'amount' => '$145,600'
    ],
    [
      'first_name' => 'Cedric',
      'last_name' => 'Kelly',
      'title' => 'Senior Javascript Developer',
      'city' => 'Edinburgh',
      'date' => '29th Mar 12',
      'amount' => '$433,060'
    ]
  ]
];

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

shuffle($resp['data']);
echo json_encode($resp);

