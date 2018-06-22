### Pre-Requisites
Ansible server machine - **VCL 14.04 Ubuntu Machine**

### Steps
- Install **Ansible** on VCL Machine (Ansible server)
```
sudo apt-add-repository ppa:ansible/ansible
sudo apt-get update
sudo apt-get install ansible
ansible --version
```
- Clone the repository into the Ansible server machine --> `git clone https://github.ncsu.edu/nsakhal/DevOpsProjectMilestone4_p1.git`
- `cd DevOpsProjectMilestone4_p1`
- Create a ~/.ssh folder before copying the config file --> `mkdir ~/.ssh`
- Copy the config file into the ~/.ssh folder --> `cp config ~/.ssh/`. Check that the [config](config) file has been copied correctly into ~/.ssh folder of your ansible machine --> `cat ~/.ssh/config`
- Edit [credentials.ini](credentials.ini) file with AWS, mongodb, mysql, emailAddress and Slack token credentials
- Run the playbook --> `ansible-playbook -i inventory main.yml`
- After the playbook has finished running successfully,go to your EC2 Dashboard and obtain the IP addresses of two slaves (having instance tagname -**ec2_checkbox**) and the IP address of the proxy-server(having instance tagname - **ec2_Mastercheckbox**)
- Check that the checkbox application is running in all three instances(_proxy-server_ and the _two slaves_) using your local web browser:
```
  - {slave-1_IP}
  - {slave-2_IP}
  - {master-server-IP}:9000
```
- ***{slave-1}*** --> checkbox **MAIN/Default server** (_checkbox[0]_)
- ***{slave-2}*** --> checkbox **BACKUP server** (_checkbox[1]_)
- **Master server** sends all the traffic to **MAIN** server by default  

___P.S:___ In order to differentiate between the two checkbox servers, the main page of checkbox **MAIN server** will have the following headings --> `Developers` , `Researchers` and `Open Science` whereas the main page of checkbox **BACKUP server** will have headings like--> `Page for Developers` , `Page for Researchers` and `Page for Open Science`
