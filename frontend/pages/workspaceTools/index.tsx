import Link from 'next/link';
import Icon from '../../components/Icon/Icon';

const workspaceTools = () => {
	return (
		<div className="flex flex-col items-center p-[0px] gap-[40px] absolute left-[72px] top-[80px] lg:py-6 w-full h-full bg-light-background">
			<div className="flex flex-col items-start p-[80px] gap-[24px] w-[72%] h-[252px] rounded-[24px] bg-white ">
				<div className="flex flex-row justify-center items-end p-[0px] gap-[24px] w-[1010px] h-[92px] ">
					<div className="flex flex-col items-end p-[0px] gap-[24px] justify-end ">
						<div className="flex flex-col items-start p-[0px] w-[1010px] h-[48px] ">
							<h1 className="display3 text-[#1F232E] ">
								Workspace tools
							</h1>
						</div>
						<p className="w-[1010px] h-[20px] body1 ">
							A set of tools to help you manage and moderate your
							workspace
						</p>
					</div>
				</div>
			</div>

			<div className="w-[72%] h-[248px] grid grid-cols-3 grid-flow-row items-center gap-[8px] ">
				<Link href="workspaceTools/userManagement" className="">
					<div className="flex flex-row cursor-pointer justify-start items-center py-[48px] px-[40px] bg-white rounded-[16px]  text-light-accent text-opacity-80">
						<Icon icon="users" className="mr-2"></Icon>
						<p className="button-large cursor-pointer">
							User Management
						</p>
					</div>
				</Link>
				<Link href="/" className="mr-2">
					<div className="flex flex-row cursor-pointer justify-start items-center  py-[48px] px-[40px] bg-white rounded-[16px] text-light-accent text-opacity-80">
						<Icon icon="subjects" className=" mr-2"></Icon>
						<p className="button-large cursor-pointer">
							Subject Management
						</p>
					</div>
				</Link>

				<Link href="/" className="">
					<div className="flex flex-row cursor-pointer justify-start items-center py-[48px] px-[40px] bg-white rounded-[16px]  text-light-accent text-opacity-80">
						<Icon icon="users" className="mr-2"></Icon>
						<p className="button-large cursor-pointer">
							User Management
						</p>
					</div>
				</Link>
				<Link href="/" className="">
					<div className="flex flex-row cursor-pointer justify-start items-center py-[48px] px-[40px] bg-white rounded-[16px]  text-light-accent text-opacity-80">
						<Icon icon="analytics" className="mr-2"></Icon>
						<p className="button-large cursor-pointer">Analytics</p>
					</div>
				</Link>
				<Link href="/" className="">
					<div className="flex flex-row cursor-pointer justify-start items-center py-[48px] px-[40px] bg-white rounded-[16px]  text-light-accent text-opacity-80">
						<Icon icon="users" className="mr-2 text"></Icon>
						<p className="button-large cursor-pointer">
							User Management
						</p>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default workspaceTools;

/* const UserPageProfessor = ({ students }) => {
  const { status, data } = useSession();
  const [user, setUser] = useState<Student | undefined>(undefined);
  const [a, seta] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);
 */
